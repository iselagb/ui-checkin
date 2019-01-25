
import React from 'react';
import PropTypes from 'prop-types';
import HtmlToReact, { Parser } from 'html-to-react';
import Barcode from 'react-barcode';
import { buildTemplate } from '../../util';

class ComponentToPrint extends React.Component {
  static propTypes = {
    template: PropTypes.string.isRequired,
    data: PropTypes.object.isRequired,
  };

  constructor(props) {
    super(props);

    const processNodeDefinitions = new HtmlToReact.ProcessNodeDefinitions(React);

    this.rules = [
      {
        replaceChildren: true,
        shouldProcessNode: node => node.name === 'barcode',
        processNode: (node, children) => (<Barcode value={children[0] ? children[0].trim() : ' '} />),
      },
      {
        shouldProcessNode: () => true,
        processNode: processNodeDefinitions.processDefaultNode,
      }
    ];

    this.parser = new Parser();
    this.template = buildTemplate(props.template);
  }

  render() {
    const {
      data,
    } = this.props;
    const componentStr = this.template(data);
    const Component = this.parser.parseWithInstructions(componentStr, () => true, this.rules) || null;

    return (
      Component
    );
  }
}

export default ComponentToPrint;
