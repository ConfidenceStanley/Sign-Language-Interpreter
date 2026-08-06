const connections = [
  [0, 1], [1, 2], [2, 3], [3, 4],
  [0, 5], [5, 6], [6, 7], [7, 8],
  [5, 9], [9, 10], [10, 11], [11, 12],
  [9, 13], [13, 14], [14, 15], [15, 16],
  [13, 17], [17, 18], [18, 19], [19, 20],
  [0, 17]
];

export default function LandmarkCanvas({ landmarks, width, height }) {
  return (
    <svg
      className="absolute inset-0 w-full h-full pointer-events-none"
      viewBox={`0 0 ${width} ${height}`}
    >
      {landmarks?.map((hand, handIndex) => (
        <g key={handIndex}>
          {connections.map(([start, end], index) => {
            const p1 = hand[start];
            const p2 = hand[end];
            if (!p1 || !p2) return null;

            return (
              <line
                key={`${handIndex}-${index}`}
                x1={p1.x * width}
                y1={p1.y * height}
                x2={p2.x * width}
                y2={p2.y * height}
                stroke={handIndex === 0 ? "#818cf8" : "#22c55e"}
                strokeWidth="2"
                strokeLinecap="round"
              />
            );
          })}

          {hand.map((point, index) => (
            <circle
              key={`${handIndex}-point-${index}`}
              cx={point.x * width}
              cy={point.y * height}
              r="4"
              fill={handIndex === 0 ? "#a5b4fc" : "#86efac"}
            />
          ))}
        </g>
      ))}
    </svg>
  );
}