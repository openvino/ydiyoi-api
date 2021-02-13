import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasManyRepositoryFactory, HasOneRepositoryFactory} from '@loopback/repository';
import {DbDataSource} from '../datasources';
import {User, UserRelations, Experience, Role, Status} from '../models';
import {ExperienceRepository} from './experience.repository';
import {RoleRepository} from './role.repository';
import {StatusRepository} from './status.repository';

export class UserRepository extends DefaultCrudRepository<
  User,
  typeof User.prototype.id,
  UserRelations
> {

  public readonly experiences: HasManyRepositoryFactory<Experience, typeof User.prototype.id>;

  public readonly role: HasOneRepositoryFactory<Role, typeof User.prototype.id>;

  public readonly status: HasOneRepositoryFactory<Status, typeof User.prototype.id>;

  constructor(
    @inject('datasources.db') dataSource: DbDataSource, @repository.getter('ExperienceRepository') protected experienceRepositoryGetter: Getter<ExperienceRepository>, @repository.getter('RoleRepository') protected roleRepositoryGetter: Getter<RoleRepository>, @repository.getter('StatusRepository') protected statusRepositoryGetter: Getter<StatusRepository>,
  ) {
    super(User, dataSource);
    this.status = this.createHasOneRepositoryFactoryFor('status', statusRepositoryGetter);
    this.registerInclusionResolver('status', this.status.inclusionResolver);
    this.role = this.createHasOneRepositoryFactoryFor('role', roleRepositoryGetter);
    this.registerInclusionResolver('role', this.role.inclusionResolver);
    this.experiences = this.createHasManyRepositoryFactoryFor('experiences', experienceRepositoryGetter,);
    this.registerInclusionResolver('experiences', this.experiences.inclusionResolver);
  }
}
