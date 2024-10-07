import { useRef, useEffect } from 'react';
import * as d3 from 'd3';

interface FinanceData {
  month: string;
  income: number;
  expenses: number;
}

const FinanceChart = ({ data }: { data: FinanceData[] }) => {
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    const svg = d3.select(svgRef.current)
      .attr('width', 800)
      .attr('height', 400);

    // Prepare the data
    const stackedData = d3.stack<FinanceData>()
      .keys(['income', 'expenses'])
      (data);

    const x = d3.scaleBand()
      .domain(data.map(d => d.month))
      .range([0, 800])
      .padding(0.1);

    const y = d3.scaleLinear()
      .domain([0, d3.max(stackedData, d => d3.max(d, d => d[1])) || 0])
      .range([400, 0]);

    const area = d3.area<d3.Stack<FinanceData>>()
      .x(d => x(d.data.month) as number)
      .y0(d => y(d[0]))
      .y1(d => y(d[1]));

    // Clear previous content
    svg.selectAll('*').remove();

    // Draw the layers
    svg.selectAll('.layer')
      .data(stackedData)
      .enter().append('path')
      .attr('class', 'layer')
      .attr('d', area)
      .attr('fill', (d, i) => (i === 0 ? 'yellow' : 'pink'));

    // Add axes
    svg.append('g')
      .attr('transform', 'translate(0, 400)')
      .call(d3.axisBottom(x));

    svg.append('g')
      .call(d3.axisLeft(y));
  }, [data]);

  return <svg ref={svgRef}></svg>;
};

export default FinanceChart;
