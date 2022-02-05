import { ISpecification } from "../specifications/specification.interface";
import { IFilter } from "./filter.interface";

export class Filter<T> implements IFilter<T> {
    filter(items: T[], specification: ISpecification<T>) {
        const filteredItems: T[] = [];
        items.forEach(item => {
            if (specification.isSatisfied(item)) {
                filteredItems.push(item);
            }
        })
        return filteredItems;
    }

}