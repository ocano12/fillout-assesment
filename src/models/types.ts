export interface FillOutApiResponse {
    responses: FillOutForm[];
    totalResponses: number;
    pageCount: number;
}

export interface FillOutForm {
    submissionId: string;
    submissionTime: string;
    lastUpdatedAt: string;
    questions: FillOutEntity[];
    calculations: FillOutEntity[];
    urlParameters: FillOutEntity[];
    quiz: { score: string; maxScore: string };
    documents: [];
}

export interface FillOutEntity {
    id: string;
    name: string;
    type?: string;
    value: string;
}

export type FilterClauseType = {
    id: string;
    condition: 'equals' | 'does_not_equal' | 'greater_than' | 'less_than';
    value: number | string;
};
