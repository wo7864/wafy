import axios from 'axios';
import { PROJECTS_URL } from '../utils/constant';


// Templates 계정 ObjectID
const TEMPLATES_OID = '60c8fff2709c6578dc695b71';

export const getSimpleProjects = async () => {
    const url = `${PROJECTS_URL}/simple/${TEMPLATES_OID}`;
    return await axios.get(url);
}

export const createTemplateProject = async (user_id, project_id) => {
    const url = `${PROJECTS_URL}/template/${user_id}/${TEMPLATES_OID}/${project_id}`;
    return await axios.post(url);
}