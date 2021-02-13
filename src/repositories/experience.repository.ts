import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor, HasManyRepositoryFactory, HasOneRepositoryFactory} from '@loopback/repository';
import {DbDataSource} from '../datasources';
import {Experience, ExperienceRelations, User, ExperienceProof, Wine, Status} from '../models';
import {UserRepository} from './user.repository';
import {ExperienceProofRepository} from './experience-proof.repository';
import {WineRepository} from './wine.repository';
import {StatusRepository} from './status.repository';

export class ExperienceRepository extends DefaultCrudRepository<
  Experience,
  typeof Experience.prototype.id,
  ExperienceRelations
> {

  public readonly user: BelongsToAccessor<User, typeof Experience.prototype.id>;

  public readonly experienceProofs: HasManyRepositoryFactory<ExperienceProof, typeof Experience.prototype.id>;

  public readonly wines: HasManyRepositoryFactory<Wine, typeof Experience.prototype.id>;

  public readonly status: HasOneRepositoryFactory<Status, typeof Experience.prototype.id>;

  constructor(
    @inject('datasources.db') dataSource: DbDataSource, @repository.getter('UserRepository') protected userRepositoryGetter: Getter<UserRepository>, @repository.getter('ExperienceProofRepository') protected experienceProofRepositoryGetter: Getter<ExperienceProofRepository>, @repository.getter('WineRepository') protected wineRepositoryGetter: Getter<WineRepository>, @repository.getter('StatusRepository') protected statusRepositoryGetter: Getter<StatusRepository>,
  ) {
    super(Experience, dataSource);
    this.status = this.createHasOneRepositoryFactoryFor('status', statusRepositoryGetter);
    this.registerInclusionResolver('status', this.status.inclusionResolver);
    this.wines = this.createHasManyRepositoryFactoryFor('wines', wineRepositoryGetter,);
    this.registerInclusionResolver('wines', this.wines.inclusionResolver);
    this.experienceProofs = this.createHasManyRepositoryFactoryFor('experienceProofs', experienceProofRepositoryGetter,);
    this.registerInclusionResolver('experienceProofs', this.experienceProofs.inclusionResolver);
    this.user = this.createBelongsToAccessorFor('user', userRepositoryGetter,);
    this.registerInclusionResolver('user', this.user.inclusionResolver);
  }
}
