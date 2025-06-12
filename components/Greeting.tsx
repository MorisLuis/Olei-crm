type Props = {
    name: string
}

export default function Greeting({ name }: Props) : JSX.Element {
    return <h1>Hello, {name}!</h1>
}
