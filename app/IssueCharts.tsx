'use client'

import {Card} from '@radix-ui/themes'
import {ResponsiveContainer, BarChart, XAxis, YAxis, Bar} from 'recharts'
interface Props {
    open: number;
    inProgress: number;
    close: number;
  }

const IssueChart = ({ open, inProgress, close }: Props) => {
    
    const data = [
        {label:'Open', value:open},
        {label:'In progress', value:inProgress},
        {label:'Close', value:close},
    ]
  return (
    <Card>
        <ResponsiveContainer width="100%" height={300}>
            <BarChart data={data}>
                <XAxis dataKey='label'/>
                <YAxis/>
                <Bar dataKey="value"/>
            </BarChart>
        </ResponsiveContainer>
    </Card>
  )
}

export default IssueChart