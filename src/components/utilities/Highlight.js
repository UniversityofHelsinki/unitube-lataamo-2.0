import React from 'react';
import PropTypes from 'prop-types';
import './Highlight.css';

const highlight = (input, query, highlightFn) => {
  const results = [];

  const fillResults = (input, query) => {
    const indexOfQuery = input.toLowerCase().indexOf(query);
    const containsQuery = indexOfQuery !== -1 && query;
    if (containsQuery) {
      const start = input.substring(0, indexOfQuery);
      const hit = input.substring(indexOfQuery, indexOfQuery + query.length);
      const rest = input.substring(indexOfQuery + query.length, input.length);
      if (start) {
        results.push(start);
      }
      results.push(highlightFn(hit));
      fillResults(rest, query);
    } else if (input) {
      results.push(input);
    }
  };

  fillResults(
    input,
    query.toLowerCase()
  );

  return results.map((r, i) => <span key={i}>{r}</span>);
};

const bold = (text) => <b>{text}</b>;

const Highlight = ({ input, what, highlightFn = bold }) => {
  if (!input || !what) {
    return input;
  }
  return (
    <>
      {highlight(input, what, highlightFn)}
    </>
  );
};

Highlight.propTypes = {
  input: PropTypes.string.isRequired,
  what: PropTypes.string,
  highlightFn: PropTypes.func,
};

export const CardHighlight = (props) => {
  const cardHighlight = (text) => <span className="card-highlight">{text}</span>;
  return <Highlight { ...props } highlightFn={cardHighlight} />;
};

export default Highlight;
