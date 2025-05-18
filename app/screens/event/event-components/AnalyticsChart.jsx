// components/AnalyticsChart.jsx
import React, { useMemo } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Svg, { G, Path } from 'react-native-svg';
import * as d3 from 'd3-shape';

export default function AnalyticsChart({
  list   = [],          // raw array of user objects
  field  = 'genderIdentification',
  palette = ['#3C555F', '#7C9CA7', '#CED7DB'],
  size   = 220,
  otherLabel = 'Other',
}) {
  /* ───────── aggregate + colour inside the component ───────── */
  const data = useMemo(() => {
    const counts = {};
    list.forEach(u => {
      const raw = u?.[field] != null ? String(u[field]) : otherLabel;
      const key = raw.trim() || otherLabel;
      counts[key] = (counts[key] || 0) + 1;
    });

    const total = Object.values(counts).reduce((s, n) => s + n, 0) || 1;
    return Object.entries(counts).map(([label, n], i) => ({
      label,
      value : Math.round((n / total) * 100),
      color : palette[i % palette.length],
    }));
  }, [list, field, palette, otherLabel]);

  /* ───────── draw the half-donut exactly like before ───────── */
  const outerR = size / 2;
  const innerR = outerR - 22;
  let start = -Math.PI / 2;

  const arcs = data.map(d => {
    const end  = start + (d.value / 100) * Math.PI;
    const path = d3
      .arc()
      .innerRadius(innerR)
      .outerRadius(outerR)
      .startAngle(start)
      .endAngle(end)();
    start = end;
    return { ...d, path };
  });

  return (
    <View style={styles.wrapper}>
      <Svg width={size} height={outerR} viewBox={`0 0 ${size} ${outerR}`}>
        <G transform={`translate(${outerR},${outerR})`}>
          {arcs.map(a => (
            <Path key={a.label} d={a.path} fill={a.color} />
          ))}
        </G>
      </Svg>

      {/* legend */}
      <View style={styles.legend}>
        {data.map(d => (
          <View style={styles.row} key={d.label}>
            <View style={[styles.dot, { backgroundColor: d.color }]} />
            <Text style={styles.label}>{d.label}</Text>
            <Text style={styles.percent}>{`${d.value}%`}</Text>
          </View>
        ))}
      </View>
    </View>
  );
}

/* ───────── styles ───────── */
const styles = StyleSheet.create({
  wrapper: { alignItems: 'center', marginVertical: 12 },
  legend : { marginTop: 14, width: '80%' },
  row    : { flexDirection: 'row', alignItems: 'center', marginVertical: 4 },
  dot    : { width: 14, height: 14, borderRadius: 7, marginRight: 8 },
  label  : { flex: 1, fontSize: 16 },
  percent: { fontSize: 16, fontWeight: '600' },
});
