export interface ISpecification<T> {
    isSatisfied(t: T): boolean;
}