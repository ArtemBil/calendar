import React from 'react';
import {
  AvailableLabelsList,
  AvailableLabelsListItem,
} from '@/app/components/UI/AvailableLabels/style';
import LabelModal from '@/app/components/UI/LabelModal';
import useAvailableLabels from '@/app/components/UI/AvailableLabels/useAvaliableLabels';

const AvailableLabels = () => {
  const { open, labels, onLabelClick, handleClose, actions, currentLabelInfo } =
    useAvailableLabels();

  if (!labels?.length) {
    return null;
  }

  return (
    <>
      <AvailableLabelsList component="ul">
        {labels.map(({ id, name, color }) => (
          <AvailableLabelsListItem
            key={id}
            labelColor={color}
            onClick={onLabelClick(id, name, color)}
          >
            #{name}
          </AvailableLabelsListItem>
        ))}
      </AvailableLabelsList>
      <LabelModal
        header="Edit label"
        open={open}
        handleClose={handleClose}
        actions={actions}
        currentLabelInfo={currentLabelInfo}
      />
    </>
  );
};

export default AvailableLabels;
