export type Entity = {
	readonly id: string;
} & Record<string, string | number | boolean | null>;

export type Data<TEntity extends Entity> = Omit<TEntity, keyof Entity>;

export type Order<TEntity extends Entity> = [keyof TEntity, number][];

export type Query<TEntity extends Entity> = Partial<TEntity>;

export default interface Gateway<TEntity extends Entity> {
	create(data: Data<TEntity>): Promise<TEntity>;

	update(id: string, data: Data<TEntity>): Promise<TEntity>;

	patch(id: string, data: Partial<Data<TEntity>>): Promise<TEntity>;

	delete(id: string): Promise<boolean>;

	findById(id: string): Promise<TEntity | null>;

	count(query: Query<TEntity>): Promise<number>;

	find(
		query: Query<TEntity>,
		order: Order<TEntity>,
		limit: number,
		offset: number
	): Promise<TEntity[]>;
}
