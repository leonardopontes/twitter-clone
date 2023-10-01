import axios from 'axios';

// buscando ligado a = (url como: string) contendo => axios.pegar(url).então((responder) com => responder. com dados);
const fetcher = (url: string) => axios.get(url).then((res) => res.data);

export default fetcher;
