'use client';

import { Card,Text, Title} from '@tremor/react';
import Link from 'next/link';

export default function PlaygroundPage() {
return (
<main className="p-4 md:p-10 mx-auto max-w-7xl">
    <div  style={{marginBottom: 20}}>
        <Title>Dashboard/{'Title Here'}</Title>
        <Link 
        className="bg-blue-500 font-200 text-white px-2 py-1 rounded mr-1"
        href={{pathname: '/'}}>{'<- '}back</Link>
    </div>
    <Card className="mt-8">
    <Title>Title here</Title>
    <Text>Category here</Text>
    {/* Youtube here */}
    <Text>Description here</Text>
</Card>
</main>
);
}
