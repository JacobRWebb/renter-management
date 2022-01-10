import { Menu } from "@headlessui/react";
import { useRouter } from "next/router";
import { FunctionComponent } from "react";

const DropdownItem: FunctionComponent<{
  displayName: string;
  to?: string;
  warning?: boolean;
}> = ({ displayName, to, warning = false }) => {
  const router = useRouter();
  return (
    <Menu.Item
      onClick={() => {
        if (to) {
          router.push(to);
        }
      }}
    >
      {({ active }) => (
        <div
          className={`flex flex-row px-4 py-2 ${
            active ? "bg-gray-100 text-gray-900" : "text-gray-700"
          } ${warning ? "text-red-600" : ""}`}
        >
          <a className={`block text-sm font-medium`}>{displayName}</a>
        </div>
      )}
    </Menu.Item>
  );
};

export default DropdownItem;
