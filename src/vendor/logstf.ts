import axios from 'axios';
import { LogIndexResponse } from './LogIndexDomain';
import { LogResponse } from './LogDomain';

export class LogsTf {
  private axiosClient = axios.create({ baseURL: 'http://logs.tf/api/v1/' });

  public async fetchLogIndex(playerId: string) {
    const response = await this.axiosClient.get(`log?player=${playerId}`,);
    if(response.status === 200){
        return response.data as LogIndexResponse
    } else {
        throw new Error(`Error fetching log index for player ${playerId}`)
    }
  }

  public async fetchLog(logId: number) {
    const response = await this.axiosClient.get(`log/${logId}`);
    if(response.status === 200){
        return response.data as LogResponse
    } else {
        throw new Error(`Error fetching log ${logId}`)
    }
  }

}

export const LogsTfApi = new LogsTf()
