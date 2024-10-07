import { useRef, useEffect } from 'react';
import * as d3 from 'd3';

interface ExpenseData {
  category: string;
  amount: number;
}

const ExpensePieChart = ({ data }: { data: ExpenseData[] }) => {
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    const svg = d3.select(svgRef.current)
      .attr('width', 300)
      .attr('height', 300)
      .append('g')
      .attr('transform', 'translate(150, 150)');

    const radius = 150;

    const pie = d3.pie<ExpenseData>()
      .value(d => d.amount);

    const arc = d3.arc<d3.PieArcDatum<ExpenseData>>()
      .innerRadius(0)
      .outerRadius(radius);

    const color = d3.scaleOrdinal(d3.schemeCategory10);

    svg.selectAll('path')
      .data(pie(data))
      .enter()
      .append('path')
      .attr('d', arc)
      .attr('fill', d => color(d.data.category));

    svg.selectAll('text')
      .data(pie(data))
      .enter()
      .append('text')
      .attr('transform', d => `translate(${arc.centroid(d)})`)
      .attr('text-anchor', 'middle')
      .text(d => d.data.category);
  }, [data]);

  return <svg ref={svgRef}></svg>;
};

export default ExpensePieChart;
