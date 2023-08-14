import { IconFolderPlus, IconMistOff, IconPlus } from '@tabler/icons-react';
import { ReactNode } from 'react';
import { useTranslation } from 'react-i18next';
import FileUploadArea from '@/components/File/FileUploadArea';
import TextInputArea from '@/components/File/TextInput';
import FileDownloadArea from '@/components/File/FileDownloadArea';
import ToggleButton from '@/components/File/toggle';
import { FileLite } from '@/types/file';
import { ChevronUpIcon } from '@heroicons/react/24/outline';
import { PluginSelect } from '@/components/Chat/PluginSelect';
import { Plugin } from '@/types/plugin';
import {
  MutableRefObject,
  useState,
} from 'react';

import {
  CloseSidebarButton,
  OpenSidebarButton,
} from './components/OpenCloseButton';

import { ClerkProvider, SignedIn, SignedOut, SignIn, UserButton } from '@clerk/nextjs';

interface Props<T> {
  isOpen: boolean;
  side: 'left' | 'right';
  items: T[];
  itemComponent: ReactNode;
  folderComponent: ReactNode;
  footerComponent?: ReactNode;
  addItemButtonTitle: string;
  searchTerm: string;
  handleSearchTerm: (searchTerm: string) => void;
  toggleOpen: () => void;
  handleCreateItem: () => void;
  handleCreateFolder: () => void;
  handleDrop: (e: any) => void;
}

const Sidebar = <T,>({
  isOpen,
  side,
  items,
  itemComponent,
  folderComponent,
  footerComponent,
  addItemButtonTitle,
  searchTerm,
  handleSearchTerm,
  toggleOpen,
  handleCreateItem,
  handleCreateFolder,
  handleDrop
}: Props<T>) => {
  const { t } = useTranslation('promptbar');

  const allowDrop = (e: any) => {
    e.preventDefault();
  };

  const highlightDrop = (e: any) => {
    e.target.style.background = '#343541';
  };

  const removeHighlight = (e: any) => {
    e.target.style.background = 'none';
  };

  const [files, setFiles] = useState<FileLite[]>([]);
  const [showPluginSelect, setShowPluginSelect] = useState(false);
  const [plugin, setPlugin] = useState<Plugin | null>(null);
  const [isTyping, setIsTyping] = useState<boolean>(false);

  return (
    <div>
      <div
        className={`sticky top-10 fixed z-40 flex h-full w-[314px] flex-none flex-col space-y-2 p-2 text-[14px] transition-all sm:relative sm:top-0`}
        style={{
          backgroundImage: `url('bkd.png')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
            {/* BLOCK 0*/}
            <div className="rounded-xl bg-[#181818] p-0 mt-2 mb-0 ml-2 shadow-sm">
              <div className="flex items-center mb-2 mt-2 ml-4 mr-3">
                <div><img src="/logo1.png" width="140" height="20" /></div>
                <div className="ml-auto"><UserButton afterSignOutUrl="/" />
                </div>
              </div>
            </div>


            {/* BLOCK 1*/}
            <div className="rounded-xl bg-[#181818] p-1 mt-2 mb-2 ml-2  shadow-sm">
                <div className="flex items-center mb-1 mt-4 ml-5 mr-5">
                  <span
                    className="text-[16px] font-semibold text-[#F7F6E9]"
                    style={{ fontFamily: 'Roboto Mono, sans-serif' }}
                  >
                    Welcome to HR-IQ!
                  </span>
                </div>
                <div className="rounded-xl bg-[#181818] p-2">
                  <div className="flex items-center pt-1 mb-0 ml-3 mr-6  shadow-sm">
                    <span
                      className="text-[12px] text-[#F7F6E9] text-sm"
                      style={{ fontFamily: 'Roboto Mono, sans-serif' }}
                    >
                      Upload resumes and a job description, and let our intelligent chatbot analyze the data,
                      generate reports, and provide customized interview questions.
                    </span>
                  </div>
                </div>
                <div className="flex items-center pt-3 ml-5 mr-5  shadow-sm">
                  <FileUploadArea
                    handleSetFiles={setFiles}
                    maxNumFiles={75}
                    maxFileSizeMB={30}
                  />
                </div>
                <div className="flex items-center pt-5 pb-5 ml-5 mr-5">
                  <TextInputArea />
                </div>
{/*                 <div className="flex items-center pt-5 ml-5 mr-5 mb-5">
                    <FileDownloadArea />
                </div> */}
            </div>

            {/* BLOCK 2*/}
            <div className="rounded-xl bg-[#181818] p-1 mt-2 mb-2 ml-2 shadow-lg">
                  <div className="flex items-center mb-1 mt-4 ml-5 mr-0">
                    <span
                      className="text-[16px] font-semibold text-[#F7F6E9]"
                      style={{ fontFamily: 'Roboto Mono, sans-serif' }}
                    >
                      Not hiring right now?
                    </span>
                  </div>
                  <div className="flex items-center mb-2 pt-2 pr-2 ml-5 mr-5">
                    <span className="text-[12px] text-[#F7F6E9] text-sm" style={{ fontFamily: 'Roboto Mono, sans-serif' }}>
                        That's okay. You can test HR-IQ right away with some resumes we have on file.
                      </span>
                  </div>
                  <div className="flex items-center justify-center mb-5 pt-2.5 pr-2 ml-5 mr-5">
                    <ToggleButton />
                  </div>
            </div>

            {/* BLOCK 3*/}
{/*             <div className="rounded-xl bg-[#181818] p-1 mt-4 mb-2 ml-2">
                  <div className="flex items-center mb-1 mt-4 ml-5 mr-5">
                    <span
                      className="text-[16px] font-semibold text-[#F7F6E9]"
                      style={{ fontFamily: 'Roboto Mono, sans-serif' }}
                    >
                      About HR-IQ
                    </span>
                  </div>
                  <div className="flex items-center mb-5 pt-3 pr-2 ml-5 mr-5">
                    <span className="text-[12px] text-[#F7F6E9] text-sm" style={{ fontFamily: 'Roboto Mono, sans-serif' }}>
                     About Content Here   
                    </span>
                  </div>
            </div> */}

            </div>

            {/* {footerComponent} */}
      </div>
  );
};

export default Sidebar;
