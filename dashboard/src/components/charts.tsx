"use client";

import React from 'react';
import {
  LineChart, Line, AreaChart, Area, BarChart, Bar, PieChart, Pie, Cell,
  XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
  ScatterChart, Scatter, ZAxis
} from 'recharts';
import { Card } from './ui-components';

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8', '#82ca9d', '#ffc658', '#8dd1e1'];

export const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white p-3 border border-gray-200 shadow-lg rounded text-sm">
        <p className="font-bold mb-2">{label}</p>
        {payload.map((entry: any, index: number) => (
          <div key={index} className="flex items-center gap-2 text-gray-600">
            <div className="w-2 h-2 rounded-full" style={{ backgroundColor: entry.color }}></div>
            <span>{entry.name}: {typeof entry.value === 'number' ? entry.value.toLocaleString() : entry.value}</span>
          </div>
        ))}
      </div>
    );
  }
  return null;
};

interface ChartProps {
  data: any[];
  title: string;
  height?: number;
}

export function AreaChartComponent({ data, xKey, yKey, title, height = 400 }: ChartProps & { xKey: string, yKey: string }) {
  return (
    <Card className="h-full min-h-[400px]">
      <h3 className="text-lg font-semibold mb-4 text-gray-800">{title}</h3>
      <ResponsiveContainer width="100%" height={height - 60}>
        <AreaChart data={data} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
          <XAxis dataKey={xKey} tick={{ fontSize: 12 }} tickLine={false} axisLine={false} />
          <YAxis tick={{ fontSize: 12 }} tickLine={false} axisLine={false} />
          <Tooltip content={<CustomTooltip />} />
          <Area type="monotone" dataKey={yKey} stroke="#8884d8" fill="#8884d8" fillOpacity={0.3} />
        </AreaChart>
      </ResponsiveContainer>
    </Card>
  );
}

export function LineChartComponent({ data, xKey, yKeys, title, height = 400, colors }: ChartProps & { xKey: string, yKeys: string[], colors?: string[] }) {
  return (
    <Card className="h-full min-h-[400px]">
      <h3 className="text-lg font-semibold mb-4 text-gray-800">{title}</h3>
      <ResponsiveContainer width="100%" height={height - 60}>
        <LineChart data={data} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
          <XAxis dataKey={xKey} tick={{ fontSize: 12 }} tickLine={false} axisLine={false} />
          <YAxis tick={{ fontSize: 12 }} tickLine={false} axisLine={false} />
          <Tooltip content={<CustomTooltip />} />
          <Legend wrapperStyle={{ paddingTop: '10px' }} />
          {yKeys.map((key, index) => (
            <Line
              key={key}
              type="monotone"
              dataKey={key}
              stroke={colors ? colors[index % colors.length] : COLORS[index % COLORS.length]}
              dot={false}
              strokeWidth={2}
            />
          ))}
        </LineChart>
      </ResponsiveContainer>
    </Card>
  );
}

// For stacked or grouped bar charts
export function BarChartComponent({ data, xKey, yKeys, title, stacked = false, layout = 'horizontal', height = 400 }: ChartProps & { xKey: string, yKeys: string[], stacked?: boolean, layout?: 'horizontal' | 'vertical' }) {
  return (
    <Card className="h-full min-h-[400px]">
      <h3 className="text-lg font-semibold mb-4 text-gray-800">{title}</h3>
      <ResponsiveContainer width="100%" height={height - 60}>
        <BarChart data={data} layout={layout} margin={{ top: 10, right: 30, left: layout === 'vertical' ? 100 : 0, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" vertical={layout === 'horizontal'} horizontal={layout === 'vertical'} stroke="#f0f0f0" />
          {layout === 'horizontal' ? (
            <>
              <XAxis dataKey={xKey} tick={{ fontSize: 12 }} tickLine={false} axisLine={false} />
              <YAxis tick={{ fontSize: 12 }} tickLine={false} axisLine={false} />
            </>
          ) : (
             <>
              <XAxis type="number" tick={{ fontSize: 12 }} tickLine={false} axisLine={false} />
              <YAxis dataKey={xKey} type="category" tick={{ fontSize: 12 }} tickLine={false} axisLine={false} width={100}/>
            </>
          )}

          <Tooltip content={<CustomTooltip />} />
          <Legend wrapperStyle={{ paddingTop: '10px' }} />
          {yKeys.map((key, index) => (
            <Bar
              key={key}
              dataKey={key}
              stackId={stacked ? "a" : undefined}
              fill={COLORS[index % COLORS.length]}
              radius={[4, 4, 0, 0]}
            />
          ))}
        </BarChart>
      </ResponsiveContainer>
    </Card>
  );
}

export function PieChartComponent({ data, nameKey, valueKey, title, height = 400 }: ChartProps & { nameKey: string, valueKey: string }) {
  return (
    <Card className="h-full min-h-[400px]">
      <h3 className="text-lg font-semibold mb-4 text-gray-800">{title}</h3>
      <ResponsiveContainer width="100%" height={height - 60}>
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            labelLine={false}
            label={({ name, percent }: { name?: string | number, percent?: number }) => `${name || ''} ${((percent || 0) * 100).toFixed(0)}%`}
            outerRadius={120}
            fill="#8884d8"
            dataKey={valueKey}
            nameKey={nameKey}
          >
            {data.map((entry: any, index: number) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </Card>
  );
}

export function ScatterChartComponent({ data, xKey, yKey, zKey, title, height = 400 }: ChartProps & { xKey: string, yKey: string, zKey?: string }) {
    return (
        <Card className="h-full min-h-[400px]">
            <h3 className="text-lg font-semibold mb-4 text-gray-800">{title}</h3>
            <ResponsiveContainer width="100%" height={height - 60}>
                <ScatterChart margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
                    <CartesianGrid />
                    <XAxis type="category" dataKey={xKey} name={xKey} allowDuplicatedCategory={false} />
                    <YAxis type="category" dataKey={yKey} name={yKey} allowDuplicatedCategory={false} />
                    {zKey && <ZAxis type="number" dataKey={zKey} range={[50, 400]} name={zKey} />}
                    <Tooltip cursor={{ strokeDasharray: '3 3' }} />
                    <Scatter name={title} data={data} fill="#8884d8" />
                </ScatterChart>
            </ResponsiveContainer>
        </Card>
    )
}
