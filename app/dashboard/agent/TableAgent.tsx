import Table from "@/components/UI/Tables/Table";

interface TableAgentInterface {
    data: unknown[];
    headers: string[];
}


export default function TableAgent({
    data, headers
}: TableAgentInterface): JSX.Element {

    const columnData = headers.map((header) => ({
        key: header,
        label: header,
        render: (value: React.ReactNode) => <span>{value}</span>,
    }));

    return (
        <Table
            columns={columnData as []}
            data={data as object[]}
            noMoreData={true}
            loadingMoreData={false}
        />
    );
}