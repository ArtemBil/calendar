import html2canvas from 'html2canvas';
import { v1 as uuidv1 } from 'uuid';
import { TaskType } from '@/types/calendar-types';
import { ChangeEvent, MutableRefObject } from 'react';

export function downloadCalendarHtmlAsImage(
  calendarRef: MutableRefObject<HTMLElement | null>,
) {
  calendarRef.current &&
    html2canvas(calendarRef.current).then((canvas) => {
      const id = uuidv1();
      const image = canvas.toDataURL('image/png');

      const createEl = document.createElement('a');
      createEl.href = image;

      createEl.download = `calendar-snapshot-${id}`;

      createEl.click();
      createEl.remove();
    });
}

export function exportCalendarDataToJsonFile(data: TaskType[]) {
  const id = uuidv1();
  const preparedData =
    'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(data));

  const createEl = document.createElement('a');
  createEl.href = preparedData;

  createEl.download = `calendar-data-${id}.json`;

  createEl.click();
  createEl.remove();
}

export function importCalendarDataFromJsonFile(
  event: ChangeEvent<HTMLInputElement>,
  callback: (data: string | ArrayBuffer | null) => void,
) {
  const reader = new FileReader();

  reader.addEventListener('load', (event) => {
    if (event.target) {
      const content = event.target.result;

      if (content) {
        callback(content);
      }
    }
  });

  if (event.target.files) {
    reader.readAsText(event.target.files[0]);
  }
}
