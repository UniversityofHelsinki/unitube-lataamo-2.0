import React from "react";
import { useTranslation } from "react-i18next";
import CollectionErrorPage from "../components/collection/CollectionErrorPage";
import HelpDialog from "../components/dialog/HelpDialog";

const useCollectionError = (httpError) => {
  const { t } = useTranslation();

  if (httpError) {
    return (
      <CollectionErrorPage 
        helpDialog={
          <HelpDialog label="collection_error_page_http_help_label">
            {t('collection_error_page_http_help_content')}
          </HelpDialog>
        }
      >
        <div className="collection-error-page-content">
          <span><b>{httpError.source.cause?.status}</b></span>
          {t('collection_error_page_http_content')}
        </div>
      </CollectionErrorPage>
    );
  }

  return null;
};

export default useCollectionError;
