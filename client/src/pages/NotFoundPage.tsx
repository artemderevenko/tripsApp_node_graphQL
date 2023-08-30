import { PageTitle } from '../components/PageTitle';
import { PageContent } from '../components/PageContent';
import { NoResults } from '../components/NoResults';

const NotFoundPage: React.FC = () => {
  return (
    <>
      <PageTitle>Page Not Found</PageTitle>
      <PageContent>
        <NoResults
          text={(<div>
            404 Error: Page Not Found. <br />
            This page may have been moved or deleted.
          </div>)}
        />
      </PageContent>
    </>
  )
};

export default NotFoundPage;