const React = require('react');
const {ReactiveComponent} = require('oo7-react');
const {Label, Icon} = require('semantic-ui-react');

function styleStatus (value) {
	return (
		value.signing ? { text: 'signing', icon: 'key', color: 'grey' } :
		value.sending ? { text: 'sending', icon: 'wifi', color: 'grey' } :
		value.broadcast ? { text: 'finalising', icon: 'cog', color: 'grey', loading: true } :
		value.finalised ? { text: 'finalised', icon: 'check', color: 'green' } :
		value.failed ? { text: 'failed', icon: 'exclamation', color: 'red' } :
		null
	);
}

class TransactionProgressLabel extends ReactiveComponent {
	constructor() {
		super(['value']);
	}
	render() {
		if (!this.state.value) {
			return (<span/>);
		}
		let status = styleStatus(this.state.value);
		return (<Label
			pointing={this.props.pointing}
			color={this.props.color || status.color}
			basic={false}
		>
			{this.props.showIcon ? (<Icon
				name={status.icon}
				loading={status.loading}
			/>) : null}
			{this.props.showContent ? status.text : null}
			{this.props.total < 2 ? null : (
				<Label.Detail>{Math.min(this.props.total, this.props.current)} of {this.props.total}</Label.Detail>
			)}
		</Label>);
	}
}
TransactionProgressLabel.defaultProps = {
	showContent: true,
	showIcon: true,
	current: 0,
	total: 0
};

module.exports = { styleStatus, TransactionProgressLabel };
