// auth imports
import {authenticate, AuthenticationBindings} from '@loopback/authentication';
import {inject} from '@loopback/core';
import {
  Count,
  CountSchema,
  Filter,
  FilterExcludingWhere,
  repository,
  Where
} from '@loopback/repository';
import {
  del, get,
  getJsonSchemaRef, getModelSchemaRef, HttpErrors, param,
  patch, post,
  put,
  requestBody,
  response
} from '@loopback/rest';
import {UserProfile} from '@loopback/security';
import * as _ from 'lodash';
import {SentMessageInfo} from 'nodemailer';
import {v4 as uuidv4} from 'uuid';
import {PasswordHasherBindings, TokenServiceBindings, UserServiceBindings} from '../keys';
import {KeyAndPassword, ResetPasswordInit, User} from '../models';
import {LoginResponse} from '../models/login-response.model';
import {Credentials, UserRepository} from '../repositories';
import {validateCredentials} from '../services';
import {EmailService} from '../services/email.service';
import {BcryptHasher} from '../services/hash.password';
import {JWTService} from '../services/jwt-service';
import {MyUserService} from '../services/user-service';
import {OPERATION_SECURITY_SPEC} from '../utils/security-spec';




export class UserController {
  constructor(
    @repository(UserRepository)
    public userRepository: UserRepository,

    // @inject('service.hasher')
    @inject(PasswordHasherBindings.PASSWORD_HASHER)
    public hasher: BcryptHasher,

    // @inject('service.user.service')
    @inject(UserServiceBindings.USER_SERVICE)
    public userService: MyUserService,

    // @inject('service.jwt.service')
    @inject(TokenServiceBindings.TOKEN_SERVICE)
    public jwtService: JWTService,

    @inject('services.EmailService')
    public emailService: EmailService,


  ) { }

  @authenticate("jwt")
  @post('/users')
  @response(200, {
    description: 'User model instance',
    content: {'application/json': {schema: getModelSchemaRef(User)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(User, {
            title: 'NewUser',
            exclude: ['id'],
          }),
        },
      },
    })
    user: Omit<User, 'id'>,
  ): Promise<User> {
    return this.userRepository.create(user);
  }

  @authenticate("jwt")
  @get('/users/count')
  @response(200, {
    description: 'User model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(User) where?: Where<User>,
  ): Promise<Count> {
    return this.userRepository.count(where);
  }

  @authenticate("jwt")
  @get('/users')
  @response(200, {
    description: 'Array of User model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(User, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(User) filter?: Filter<User>,
  ): Promise<User[]> {
    return this.userRepository.find(filter);
  }

  @authenticate("jwt")
  @patch('/users')
  @response(200, {
    description: 'User PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(User, {partial: true}),
        },
      },
    })
    user: User,
    @param.where(User) where?: Where<User>,
  ): Promise<Count> {
    return this.userRepository.updateAll(user, where);
  }

  @authenticate("jwt")
  @get('/users/{id}')
  @response(200, {
    description: 'User model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(User, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    @param.filter(User, {exclude: 'where'}) filter?: FilterExcludingWhere<User>
  ): Promise<User> {
    return this.userRepository.findById(id, filter);
  }

  @authenticate("jwt")
  @patch('/users/{id}')
  @response(204, {
    description: 'User PATCH success',
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(User, {partial: true}),
        },
      },
    })
    user: User,
  ): Promise<void> {
    await this.userRepository.updateById(id, user);
  }

  // @authenticate("jwt")
  // @put('/users/{id}')
  // @response(204, {
  //   description: 'User PUT success',
  // })
  // async replaceById(
  //   @param.path.number('id') id: number,
  //   @requestBody() user: User,
  // ): Promise<void> {
  //   await this.userRepository.replaceById(id, user);
  // }

  @authenticate("jwt")
  @del('/users/{id}')
  @response(204, {
    description: 'User DELETE success',
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.userRepository.deleteById(id);
  }

  @post('/signup', {
    responses: {
      '200': {
        description: 'User',
        content: {
          schema: getJsonSchemaRef(User)
        }
      }
    }
  })
  async signup(@requestBody() userData: User): Promise<User> {
    validateCredentials(_.pick(userData, ['email', 'password']));

    const existingUser = await this.userRepository.findOne({
      where: {email: userData.email},
    });

    if (existingUser) {
      throw new HttpErrors.Conflict('El correo electrónico ya está registrado.');
    }


    userData.password = await this.hasher.hashPassword(userData.password);
    const savedUser = await this.userRepository.create(userData);


    return savedUser;
  }

  @post('/login', {
    responses: {
      '200': {
        description: 'Token',
        content: {
          'application/json': {
            schema: {
              type: 'object',
              properties: {
                token: {
                  type: 'string'
                }
              }
            }
          }
        }
      }
    }
  })
  async login(
    @requestBody() credentials: Credentials,
  ): Promise<{loginResponse: LoginResponse}> {

    // make sure user exist,password should be valid
    const user = await this.userService.verifyCredentials(credentials);
    // console.log(user);
    const userProfile = await this.userService.convertToUserProfile(user);
    // console.log(userProfile);
    const token = await this.jwtService.generateToken(userProfile);

    let loginResponse = new LoginResponse({token: token, user: user});

    return Promise.resolve({loginResponse: loginResponse})
  }


  @authenticate("jwt")
  @get('/users/me', {
    security: OPERATION_SECURITY_SPEC,
    responses: {
      '200': {
        description: 'The current user profile',
        content: {
          'application/json': {
            schema: getJsonSchemaRef(User),
          },
        },
      },
    },
  })
  async me(
    @inject(AuthenticationBindings.CURRENT_USER)
    currentUser: UserProfile,
  ): Promise<UserProfile> {
    return Promise.resolve(currentUser);
  }

  // We will add our password reset here
  @post('/reset-password/init')
  async resetPasswordInit(
    @requestBody() resetPasswordInit: ResetPasswordInit,
  ): Promise<string> {
    // checks whether email is valid as per regex pattern provided
    const email = await this.validateEmail(resetPasswordInit.email);

    // At this point we are dealing with valid email.
    // Lets check whether there is an associated account
    const foundUser = await this.userRepository.findOne({
      where: {email},
    });

    // No account found
    if (!foundUser) {
      throw new HttpErrors.NotFound(
        'No hay una cuenta asociada con la dirección de correo electrónico proporcionada.',
      );
    }

    // We generate unique reset key to associate with reset request
    foundUser.resetKey = uuidv4();

    try {
      // Updates the user to store their reset key with error handling
      await this.userRepository.updateById(foundUser.id, foundUser);
    } catch (err) {
      console.log(err);
      return "error storing reset key"
    }

    // Send an email to the user's email address
    const nodeMailer: SentMessageInfo = await this.emailService.sendResetPasswordMail(
      foundUser,
    );

    // Nodemailer has accepted the request. All good
    if (nodeMailer.accepted.length) {
      return 'Se ha enviado un correo electrónico con instrucciones para restablecer la contraseña al correo electrónico proporcionado.';
    }

    // Nodemailer did not complete the request alert the user
    throw new HttpErrors.InternalServerError(
      'Error al enviar el correo electrónico para restablecer la contraseña',
    );
  }

  @put('/reset-password/finish')
  async resetPasswordFinish(
    @requestBody() keyAndPassword: KeyAndPassword,
  ): Promise<string> {
    // Checks whether password and reset key meet minimum security requirements
    const {resetKey, password, walletAddress} = await this.validateKeyPassword(keyAndPassword);

    // Search for a user using reset key
    const foundUser = await this.userRepository.findOne({
      where: {resetKey: resetKey},
    });

    // No user account found
    if (!foundUser) {
      throw new HttpErrors.NotFound(
        'No hay una cuenta asociada con la reset key proporcionada.',
      );
    }

    // Encrypt password to avoid storing it as plain text
    const passwordHash = await this.hasher.hashPassword(password);

    try {
      // Update user password with the newly provided password
      // await this.userRepository
      //   .userCredentials(foundUser.id)
      //   .patch({password: passwordHash});

      foundUser.password = passwordHash;
      // Remove reset key from database its no longer valid
      foundUser.resetKey = '';
      foundUser.walletAddress = walletAddress;
      // Update the user removing the reset key
      await this.userRepository.updateById(foundUser.id, foundUser);
    } catch (err) {
      console.log(err);
      return "error storing reset key"
    }

    return 'La solicitud de restablecimiento de contraseña se completó correctamente';
  }

  async validateKeyPassword(keyAndPassword: KeyAndPassword): Promise<KeyAndPassword> {
    if (!keyAndPassword.password || keyAndPassword.password.length < 8) {
      throw new HttpErrors.UnprocessableEntity(
        'La contraseña debe tener un mínimo de 8 caracteres',
      );
    }

    if (keyAndPassword.password !== keyAndPassword.confirmPassword) {
      throw new HttpErrors.UnprocessableEntity(
        'La contraseña y la contraseña de confirmación no coinciden',
      );
    }

    if (
      _.isEmpty(keyAndPassword.resetKey) ||
      keyAndPassword.resetKey.length === 0 ||
      keyAndPassword.resetKey.trim() === ''
    ) {
      throw new HttpErrors.UnprocessableEntity('Reset key is mandatory');
    }

    return keyAndPassword;
  }

  async validateEmail(email: string): Promise<string> {
    const emailRegPattern = /\S+@\S+\.\S+/;
    if (!emailRegPattern.test(email)) {
      throw new HttpErrors.UnprocessableEntity('Invalid email address');
    }
    return email;
  }



}
