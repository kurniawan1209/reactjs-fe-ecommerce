export function Paginate(data, page){
    const pages = Math.ceil(data.length / page);
    const datas = [];

    for (let i=0; i<pages; i++){
        let start = i * page;
        let end = start + page;

        datas.push(data.slice(start, end));
    }

    return datas;
}