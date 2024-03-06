import { Request, Response } from 'express';
import { filterService } from './filter.service';
import { FillOutForm } from '../models/types';
import { filterClauseSchema } from '../utils/jsonValidation';
import { ValidationError } from 'joi';

export const filterController = async (req: Request, res: Response) => {
    const formID: string = req.params.formID;
    const filter = req.query.filter as string | undefined;

    const formData: FillOutForm[] = await filterService.fetchForm(formID);

    if (!formData) {
        return res.status(404).send({ message: 'Form Data not Found!' });
    }

    if (!filter) {
        return res.status(200).send(formData);
    }

    try {
        const filteredData = await processFilter(filter, formData);
        // if (filteredData.length <= 0) {
        //     return res.status(200).send({ message: 'No entry found!' });
        // }
        return res.status(200).send(filteredData);
    } catch (error) {
        return res.status(400).send({ error: 'Invalid filter query parameter' });
    }
};

async function processFilter(filter: string, formData: FillOutForm[]) {
    const normalizedFilter = JSON.parse(decodeURIComponent(filter));
    const { value, error } = filterClauseSchema.validate(normalizedFilter) as { value: any; error: ValidationError };

    if (error) {
        throw new Error(error.details[0].message || 'Invalid filter');
    }

    return await filterService.filterData(formData, value);
}
