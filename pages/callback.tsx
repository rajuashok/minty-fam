import { Spinner } from '@chakra-ui/spinner';
import Layout from '../components/Layout';
import Content from '../components/Content';

export default function Callback() {

  return (
    <Layout>
      <Content>
        <Spinner />
      </Content>
    </Layout>
  );
}
