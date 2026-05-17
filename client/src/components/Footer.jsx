import React, { useState, useEffect } from 'react'
import { FaWhatsapp, FaDownload, FaCommentDots } from "react-icons/fa"; 

const Footer = () => {
  const [deferredPrompt, setDeferredPrompt] = useState(null);
  const [isInstallable, setIsInstallable] = useState(false);

  useEffect(() => {
    const handleBeforeInstallPrompt = (e) => {
      // 1. Browser ke default prompt ko roko
      e.preventDefault();
      // 2. Event ko save karo
      setDeferredPrompt(e);
      // 3. Footer me button ko show karo (jaise index.html me display: block kiya tha)
      setIsInstallable(true);
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);

    // Hide if App Is Already Installed Successfully
    window.addEventListener('appinstalled', () => {
      setDeferredPrompt(null);
      setIsInstallable(false);
    });

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    };
  }, []);

  const handleInstallClick = async (e) => {
    e.preventDefault();
    if (!deferredPrompt) return;
    
    // 4. Footer button click par seedhe prompt open karo
    deferredPrompt.prompt();
    
    const { outcome } = await deferredPrompt.userChoice;
    if (outcome === 'accepted') {
      console.log('AdiMart application shortcut successfully pinned!');
    }
    
    // 5. State clean karo aur button ko hide kar do
    setDeferredPrompt(null);
    setIsInstallable(false);
  };

  return (
    <footer className='border-t bg-white sticky bottom-0 z-50 shadow-[0_-2px_10px_rgba(0,0,0,0.05)]'>
        <div className='container mx-auto px-4 py-3 flex flex-col md:flex-row justify-between items-center gap-3'>
            
            {/* Copyright */}
            <p className='text-gray-500 text-[10px] md:text-xs order-3 md:order-1'>
                © 2026 AdiMart
            </p>

            {/* Main Actions Container */}
            <div className='flex flex-wrap items-center justify-center gap-2 order-1 md:order-2'>
                
                {/* DYNAMIC INSTALL APP BUTTON - Tabhi dikhega jab browser ready hoga */}
                {isInstallable && (
                    <button 
                        onClick={handleInstallClick}
                        className='flex items-center gap-1.5 bg-red-600 text-white px-3 py-1.5 rounded-lg hover:bg-red-700 transition-all text-xs font-bold shadow-md active:scale-95'
                    >
                        <FaDownload className='text-xs'/>
                        INSTALL APP
                    </button>
                )}

                {/* FEEDBACK BUTTON */}
                <a 
                    href='https://forms.gle/NmRBCiqYGCmhb9ck8'
                    target="_blank"
                    rel="noopener noreferrer"
                    className='flex items-center gap-1.5 bg-purple-600 text-white px-3 py-1.5 rounded-lg hover:bg-purple-700 transition-all text-xs font-bold shadow-md active:scale-95'
                >
                    <FaCommentDots className='text-xs'/>
                    FEEDBACK
                </a>

                {/* HELP SECTION */}
                <div className='flex items-center gap-2 ml-1 border-l pl-2 border-gray-200'>
                    <span className='text-[10px] font-bold text-gray-400 hidden sm:block'>NEED HELP?</span>
                    <a 
                        href='https://wa.me/919369250645?text=Hello%20Aditya!%20I%20need%20help%20with%20my%20Order.'
                        target="_blank"
                        rel="noopener noreferrer"
                        className='flex items-center gap-1.5 bg-green-500 text-white px-3 py-1.5 rounded-lg hover:bg-green-600 transition-all text-xs font-bold shadow-md active:scale-95'
                    >
                        <FaWhatsapp className='text-base'/>
                        SUPPORT
                    </a>
                </div>
            </div>
        </div>
    </footer>
  )
}

export default Footer;
