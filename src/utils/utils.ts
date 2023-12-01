import html2canvas from "html2canvas";
import { v1 as uuidv1 } from "uuid";
import { TasksType } from "@/types/calendar-types";
import { setTasks } from "@/store/slices/tasks-slice";

export function downloadCalendarHtmlAsImage(calendarRef) {
  calendarRef.current &&
    html2canvas(calendarRef.current).then((canvas) => {
      const id = uuidv1();
      var image = canvas.toDataURL("image/png");

      const createEl = document.createElement("a");
      createEl.href = image;

      // This is the name of our downloaded file
      createEl.download = `calendar-snapshot-${id}`;

      // Click the download button, causing a download, and then remove it
      createEl.click();
      createEl.remove();
    });
}

export function exportCalendarDataToJsonFile(data: TasksType[]) {
  const id = uuidv1();
  const preparedData =
    "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(data));

  const createEl = document.createElement("a");
  createEl.href = preparedData;

  // This is the name of our downloaded file
  createEl.download = `calendar-data-${id}.json`;

  // Click the download button, causing a download, and then remove it
  createEl.click();
  createEl.remove();
}

export function importCalendarDataFromJsonFile(
  event,
  callback,
): TasksType[] | undefined {
  const reader = new FileReader();

  reader.addEventListener("load", (event) => {
    const content = event.target.result;

    try {
      const data = JSON.parse(content);

      if (data) {
        callback(data);
      }
    } catch (e) {
      console.log(e);
    }
  });

  reader.readAsText(event.target.files[0]);
}
