import axios from "axios";

export const baseUrl = "http://BASE_URL:8098"

export const setAuthorizationHeader = ({ isLoggedIn, token }) => {
    if (isLoggedIn) {
        const authorizationHeaderValue = `Bearer ${token}`;
        axios.defaults.headers['Authorization'] = authorizationHeaderValue;
    } else {
        delete axios.defaults.headers['Authorization'];
    }
};

export const createManager = body => {//fonksiyona erişilebilirlik için export ediyoruz
    return axios.post(baseUrl + '/api/1.0/employees/create-manager', body)
}


export const createEmployee = body => {//fonksiyona erişilebilirlik için export ediyoruz
    return axios.post(baseUrl + '/api/1.0/employees/create-employee', body)
}


export const login = creds => {//fonksiyona erişilebilirlik için export ediyoruz
    return axios.post(baseUrl + '/api/1.0/auth/business', creds)
}

export const saveTask = body => {//fonksiyona erişilebilirlik için export ediyoruz
    return axios.post(baseUrl + '/api/1.0/task', body)
}

export const getCompletedTasksByEmployeeFk = employeeFk => {//fonksiyona erişilebilirlik için export ediyoruz
    return axios.get(baseUrl + '/api/1.0/task/get-completed-tasks-by-employeefk', {
        params: { employeeFk }
    })
}

export const getUncompletedTasksByEmployeeFk = employeeFk => {//fonksiyona erişilebilirlik için export ediyoruz
    return axios.get(baseUrl + '/api/1.0/task/get-uncompleted-tasks-by-employeefk', {
        params: { employeeFk }
    })
}

export const getAllEmployeesByCompanyFk = companyFk => {//fonksiyona erişilebilirlik için export ediyoruz
    return axios.get(baseUrl + '/api/1.0/employees/get-all-employees-by-companyfk', {
        params: { companyFk }
    })
}



export const updateTaskCompleteStatusByTaskPk = (taskPk, status) => {//fonksiyona erişilebilirlik için export ediyoruz
    return axios.get(baseUrl + '/api/1.0/task/update-task-complete-status-by-taskpk', {
        params: { taskPk, status }
    })
}

export const deleteTaskByTaskPk = taskPk => {//fonksiyona erişilebilirlik için export ediyoruz
    return axios.delete(baseUrl + '/api/1.0/task/delete-task-by-taskpk', {
        params: { taskPk }
    })
}

export const logout = () => {
    return axios.post(baseUrl + '/api/1.0/logout');
}