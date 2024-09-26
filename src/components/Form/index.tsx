import { FormEvent } from 'react';
import { useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { FormFieldDataType } from '../../types/formsTypes.ts';
import './Form.styles.scss';

interface FormProps {
  formFields: FormFieldDataType[];
  onSubmit: (event: FormEvent) => void;
  buttonsBlock?: JSX.Element;
  readOnlyFields?: string[];
  isUpdate?: boolean;
}

function Form({
  formFields,
  onSubmit,
  buttonsBlock,
  readOnlyFields,
  isUpdate,
}: FormProps) {
  const { userId, cvId } = useParams();
  const { t } = useTranslation();
  return (
    <form className="form" onSubmit={onSubmit}>
      {formFields.map(
        ({
          name,
          Element,
          getLabel,
          menuItemsList,
          getFilteredListData,
          getFullListData,
          getDependentValue,
        }) => {
          return (
            <Element
              name={name}
              label={getLabel(t)}
              menuItemsList={menuItemsList}
              isAddOrUpdate
              listData={
                isUpdate && getFilteredListData
                  ? getFilteredListData(userId, cvId)
                  : getFullListData?.()
              }
              getDependentValue={getDependentValue}
              readOnly={readOnlyFields?.includes(name)}
            />
          );
        }
      )}
      {buttonsBlock}
    </form>
  );
}

export default Form;
