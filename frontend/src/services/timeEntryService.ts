import axios from 'axios';
import TimeEntry from '../interfaces/TimeEntry';

// TODO: Update with backend URL
const API_URL = '/api/time-entries'; 

export async function createTimeEntry(entryData: TimeEntry): Promise<string> {
    try {
        const response = await axios.post(`${API_URL}/entries`, entryData);
        return response.data.entryId;
    } catch (error) {
        throw new Error('Failed to create time entry.');
    }
}


export const getTimeEntries = async () => {
  try {
    const response = await axios.get(API_URL);
    return response.data;
  } catch (error) {
    throw new Error('Failed to fetch time entries');
  }
};

export async function getTimeEntriesByTask(taskId: string): Promise<TimeEntry[]> {
    try {
        const response = await axios.get(`${API_URL}/entries/task/${taskId}`);
        return response.data.entries;
    } catch (error) {
        throw new Error('Failed to fetch time entries.');
    }
}

export async function getTimeEntriesByProject(projectId: string): Promise<TimeEntry[]> {
    try {
        const response = await axios.get(`${API_URL}/entries/project/${projectId}`);
        return response.data.entries;
    } catch (error) {
        throw new Error('Failed to fetch time entries.');
    }
}

