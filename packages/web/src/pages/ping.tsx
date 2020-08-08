import { NextPage } from 'next';
import { withAdapter } from '@vjcspy/web-ui';

const Ping: NextPage<{ request: any }> = props => {
  return (
    <div>
      <pre>{JSON.stringify(props.request, null, '\t')}</pre>
    </div>
  );
};

Ping.getInitialProps = context => {
  return {
    request: context.req ? context.req.headers : null
  };
};

export default withAdapter(Ping);
