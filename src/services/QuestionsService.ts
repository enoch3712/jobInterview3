import Question from '../DTOs/Question';

const QuestionsService = {
  getAnswers
};

const mock = [
    {
      "question": "Raptor Engine thurst in lbs",
      "answer": ""
    },
    {
      "question": "Level of inflation expected for 2022",
      "answer": ""
    },
    {
      "question": "Number of parameters in the GPT-3",
      "answer": ""
    },
  ] as Question[];

function getAnswers() : Promise<Question[]> {
  return new Promise(async (resolve, reject) => {

    resolve(mock);
    // try
    // {
    //     let request = await axios.request<QuestionsResponse>({url: `${config.apiUrl}`,headers: { ...authHeader()}});

    //     if(request.data.response_code !== 0) {
    //         reject({title: "Error", message: "it was not a succesful request"} as Error)
    //     }

    //     //let response = mock.results as Question[];
    //     let response = request.data.results as Question[];

    //     resolve(response);
    // }
    // catch(e)
    // {
    //     reject({title: "Error Server", message: "The server is not responding"} as Error)
    // }
  });
}

export default QuestionsService;