import React from "react";
import axios from "axios";

/* returns a component with relevant data from the wordpress api */
function withWordpressData(WrappedComponent) {
  return class extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        loading: false,
        data: [],
        error: "",
      };
    }

    componentDidMount() {
      this.setState(
        {
          loading: true,
        },
        () =>
          axios
            .get(this.props.endpoint)
            .then((res) => {
              this.setState({
                loading: false,
                data: Array.isArray(res.data)
                  ? [...res.data]
                  : [{ ...res.data }],
              });
            })
            .catch((error) => {
              this.setState({
                loading: false,
                error: error.response,
              });
            })
      );
    }

    render() {
      const { loading, data, error } = this.state;
      return (
        <WrappedComponent
          loading={loading}
          data={data}
          error={error}
          {...this.props}
        />
      );
    }
  };
}

export default withWordpressData;
