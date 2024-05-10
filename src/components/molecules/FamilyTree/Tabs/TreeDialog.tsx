import { CustomRightDialog } from 'components/atoms/CustomRightDialog';
import { TabContent } from 'components/atoms/FamilyTree/Tab/TabContent';
import { TabNavigation } from 'components/atoms/FamilyTree/Tab/TabNavigation';
import { TABS } from 'components/contexts/TabContext';
import { DocumentTab } from 'components/organisms/FamilyTree/Tabs/DocumentTab';
import { DocumentsDataTab } from 'components/organisms/FamilyTree/Tabs/DocumentsDataTab';
import { SuccessTab } from 'components/organisms/FamilyTree/Tabs/SuccessTab';
import { UploadTab } from 'components/organisms/FamilyTree/Tabs/UploadTab';
import { useTabStore } from 'components/stores/useTabStore';
import { useUploadStore } from 'components/stores/useUploadStore';
import { useEffect } from 'react';
import { Footer } from '../Actions/Footer';

export enum TreeDialogMode {
  NEW = 'new',
  EDIT = 'edit',
}

type TreeDialogProps = {
  open: boolean;
  onClose: () => void;
  mode?: TreeDialogMode;
};

const DISPLAY_TITLES: { [key: string]: { [key: string]: string } } = {
  [TreeDialogMode.NEW]: {
    [TABS.FIRST]: 'How do want to create your family member?',
    [TABS.SECOND]: 'Select the type of documents you just uploaded',
    [TABS.THIRD]: 'Fill out the data you have on the documents',
    [TABS.FOURTH]: 'Thank you for your submission!',
  },
  [TreeDialogMode.EDIT]: {
    [TABS.FIRST]: 'Edit your family member',
    [TABS.SECOND]: 'Manage the documents of your family member',
    [TABS.THIRD]: 'Fill out the data you have on the documents',
    [TABS.FOURTH]: 'All set! Thank you',
  },
};

export function TreeDialog({
  open,
  onClose,
  mode = TreeDialogMode.NEW,
}: TreeDialogProps) {
  const setFiles = useUploadStore((state) => state.setFiles);
  const currentTabId = useTabStore((state) => state.currentId);
  const currentTitle = DISPLAY_TITLES[mode][currentTabId] as unknown as string;

  useEffect(() => {
    if (open === false) {
      setFiles([]);
    }
  }, [open, setFiles]);

  return (
    <CustomRightDialog
      actions={<Footer onClose={onClose} />}
      fullScreen
      id='family-tree-dialog'
      onClose={onClose}
      open={open}
      removeOverflow
      title={currentTitle}
    >
      <TabNavigation />
      <TabContent id={TABS.FIRST}>
        <UploadTab />
      </TabContent>
      <TabContent id={TABS.SECOND}>
        <DocumentTab />
      </TabContent>
      <TabContent id={TABS.THIRD}>
        <DocumentsDataTab />
      </TabContent>
      <TabContent id={TABS.FOURTH}>
        <SuccessTab />
      </TabContent>
    </CustomRightDialog>
  );
}
