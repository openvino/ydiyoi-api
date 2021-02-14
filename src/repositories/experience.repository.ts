import {Getter, inject} from '@loopback/core';
import {BelongsToAccessor, DefaultCrudRepository, HasManyRepositoryFactory, repository} from '@loopback/repository';
import {DbDataSource} from '../datasources';
import {Experience, ExperienceProof, ExperienceRelations, User, Wine} from '../models';
import {ExperienceProofRepository} from './experience-proof.repository';
import {UserRepository} from './user.repository';
import {WineRepository} from './wine.repository';

export class ExperienceRepository extends DefaultCrudRepository<
  Experience,
  typeof Experience.prototype.id,
  ExperienceRelations
  > {

  public readonly user: BelongsToAccessor<User, typeof Experience.prototype.id>;

  public readonly experienceProofs: HasManyRepositoryFactory<ExperienceProof, typeof Experience.prototype.id>;

  public readonly wines: HasManyRepositoryFactory<Wine, typeof Experience.prototype.id>;

  constructor(
    @inject('datasources.db') dataSource: DbDataSource, @repository.getter('UserRepository') protected userRepositoryGetter: Getter<UserRepository>, @repository.getter('ExperienceProofRepository') protected experienceProofRepositoryGetter: Getter<ExperienceProofRepository>, @repository.getter('WineRepository') protected wineRepositoryGetter: Getter<WineRepository>,
  ) {
    super(Experience, dataSource);
    this.wines = this.createHasManyRepositoryFactoryFor('wines', wineRepositoryGetter,);
    this.registerInclusionResolver('wines', this.wines.inclusionResolver);
    this.experienceProofs = this.createHasManyRepositoryFactoryFor('experienceProofs', experienceProofRepositoryGetter,);
    this.registerInclusionResolver('experienceProofs', this.experienceProofs.inclusionResolver);
    this.user = this.createBelongsToAccessorFor('user', userRepositoryGetter,);
    this.registerInclusionResolver('user', this.user.inclusionResolver);
  }
}
