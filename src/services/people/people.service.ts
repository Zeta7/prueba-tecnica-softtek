import boom from '@hapi/boom'
import axios, { AxiosResponse } from 'axios'

import { config } from '../../config/config'
import { language } from '../../utils/language'
import { PeopleEnglishType } from './people.type'
import { HttpResponse } from '../../bases/responses/http.response'

class PeopleService {
    async getPeoples(): Promise<HttpResponse.getSuccessful> {
        try {
            const response: AxiosResponse<any, any> = await axios.get(`${config.swapi}/people`)
            const data: PeopleEnglishType[] = response.data.results
    
            const dataTrad: object[] = data.map((objeto: PeopleEnglishType) => {
                const nuevoObjeto: object = {}
    
                for (const propiedad in objeto) {
                    if (language.hasOwnProperty(propiedad)) {
                        nuevoObjeto[language[propiedad]] = objeto[propiedad]
                    } else {
                        nuevoObjeto[propiedad] = objeto[propiedad]
                    }
                }
    
                return nuevoObjeto
            })

            return new HttpResponse.getSuccessful(dataTrad)
        } catch (error) {
            throw boom.badRequest(error)
        }
    }
}

export default new PeopleService()