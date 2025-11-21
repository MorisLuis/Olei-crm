import Table from "@/components/UI/Tables/Table";

interface TableAgentInterface {
    data: any[];
    headers: string[];
}


export default function TableAgent({
    data, headers
}: TableAgentInterface): JSX.Element {

    console.log({data, headers})

    const columnData = headers.map((header) => ({
        key: header,
        label: header,
        render: (value: any) => <span>{value}</span>,
    }));

    return (
        <Table
            columns={columnData}
            data={data}
            noMoreData={false}
            loadingMoreData={false}
            handleLoadMore={() => {}}
            handleSelectItem={() => {}}
        />
    );
}