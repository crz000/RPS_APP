import axios from 'axios';


export const getDataFromDb = (callback) => {
    fetch('http://localhost:3001/api/getData')
        .then((data) => data.json())
        .then((res) => callback(res.data));
};

export const putDataToDB = (data, success, error) => {
    axios.post('http://localhost:3001/api/putData', {
        ...data
    }).then(success).catch(error);
};
export const updateDB = (id, updatedObj, success, error) => {
    parseInt(id);
    axios.post('http://localhost:3001/api/updateData', {
      id: id,
      update: { ...updatedObj },
    }).then(success).catch(error);
  };

  