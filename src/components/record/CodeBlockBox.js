import { CodeBlock, github } from 'react-code-blocks';
import PropTypes from "prop-types";

const CodeBlockBox = ({ text, language, showLineNumbers, theme }) => {

    return (
        <CodeBlock
            text={text}
            language={language}
            showLineNumbers={showLineNumbers}
            theme={theme}
        />
    );
}


CodeBlockBox.propTypes = {
    code: PropTypes.string.isRequired,
    language: PropTypes.string.isRequired,
    showLineNumbers: PropTypes.string.isRequired,
    theme: PropTypes.string.isRequired
};
export default CodeBlockBox;
