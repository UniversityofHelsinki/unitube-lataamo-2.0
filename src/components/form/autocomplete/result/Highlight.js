import React from 'react';
import PropTypes from 'prop-types';
import './Highlight.css';

const highlight = (input, what, results = []) => {
    const lowercased = input.toLowerCase();
    const i = lowercased.search(what.toLowerCase());
    if (i === -1) {
        results.push(<span key={results.length+1}>{input}</span>);
        return results;
    }
    const part = input.substring(0, i);
    if (part) {
        results.push(<span key={results.length+1}>{part}</span>);
    }
    const highlightedPart = input.substring(i, what.length+i);
    results.push(<b key={results.length+1}>{highlightedPart}</b>);
    return highlight(input.substring(what.length+i), what, results);
};

const Highlight = ({ input, what }) => {
  return (
    <>
      {highlight(input, what)}
    </>
  );
};

Highlight.propTypes = {
  input: PropTypes.string.isRequired,
  what: PropTypes.string
};

export default Highlight;
