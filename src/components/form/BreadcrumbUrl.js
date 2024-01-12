import Breadcrumb from 'react-bootstrap/Breadcrumb';

function BreadcrumbUrl({crumbs}) {

    const listCrumbs = (crumbs) => {
        return crumbs.map(crumb => (
            <Breadcrumb.Item href="#" active>{crumb}</Breadcrumb.Item>
        ))
    };

    return (
        <Breadcrumb>
            {listCrumbs(crumbs)}
        </Breadcrumb>
    );
}

BreadcrumbUrl.propTypes = {
};
export default BreadcrumbUrl;
