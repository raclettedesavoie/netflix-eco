import { SerieBase } from "../shared/types";

const API_BASE_URL = '/api/user-series';

export class UserSeriesApiService {
    /**
     * @return Success
     */
    async userSeriesAll(): Promise<SerieBase[]> {
        const res = await fetch(API_BASE_URL, {
            method: 'GET'
        });

        if (!res.ok) {
            throw new Error(`Erreur lors du chargement des séries : ${res.statusText}`);
        }

        return res.json();
    }

    /**
     * @return Success
     */
    async userSeriesGET(id: number): Promise<SerieBase> {
        const res = await fetch(`${API_BASE_URL}/${id}`, {
            method: 'GET'
        });

        if (!res.ok) {
            throw new Error(`Erreur lors du chargement de la série ${id} : ${res.statusText}`);
        }

        return res.json();
    }

    /**
     * @param body (optional) 
     * @return Success
     */
    async userSeriesPUT(id: number, body?: SerieBase): Promise<void> {
        const res = await fetch(`${API_BASE_URL}/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(body)
        });

        if (!res.ok) {
            throw new Error(`Erreur lors de la mise à jour de la série ${id} : ${res.statusText}`);
        }
    }

    /**
     * @return Success
     */
    async userSeriesDELETE(id: number): Promise<void> {
        const res = await fetch(`${API_BASE_URL}/${id}`, {
            method: 'DELETE'
        });

        if (!res.ok) {
            throw new Error(`Erreur lors de la suppression de la série ${id} : ${res.statusText}`);
        }
    }
}
