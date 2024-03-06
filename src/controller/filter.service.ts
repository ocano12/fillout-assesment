import axios, { AxiosResponse } from 'axios';
import { FillOutApiResponse, FillOutEntity, FillOutForm, FilterClauseType } from '../models/types';

const fetchForm = async (formID: string) => {
    try {
        const form: AxiosResponse<FillOutApiResponse> = await axios.get(`${process.env.FILLOUT_API_HOST}/${formID}/submissions`, {
            headers: {
                Authorization: `Bearer ${process.env.API_KEY}`,
            },
        });

        return form.data.responses;
    } catch (error) {
        throw new Error('Api Failed');
    }
};

const filterData = (formData: FillOutForm[], filter: FilterClauseType[]) => {
    return formData.filter((form: FillOutForm) => {
        return form.questions.some((question: FillOutEntity) => {
            return filter.some((filter) => {
                if (question.id !== filter.id) return false;
                switch (filter.condition) {
                    case 'equals':
                        return question.value === filter.value;
                    case 'does_not_equal':
                        return question.value !== filter.value;
                    case 'greater_than':
                        return question.value > filter.value;
                    case 'less_than':
                        return question.value < filter.value;
                }
            });
        });
    });
};

export const filterService = {
    fetchForm,
    filterData,
};
