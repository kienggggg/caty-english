import React from 'react';
import { MobileHeader } from './components/MobileHeader';
import { BottomNav } from './components/BottomNav';
import { AdaptivePlacementModal } from './components/AdaptivePlacementModal';
import { JourneyScreen } from './screens/JourneyScreen';
import { SparringScreen } from './screens/SparringScreen';
import { SoundLabScreen } from './screens/SoundLabScreen';
import { SRSVaultScreen } from './screens/SRSVaultScreen';
import { MotivationVaultScreen } from './screens/MotivationVaultScreen';
import { ProfileScreen } from './screens/ProfileScreen';
import { useUserStore } from './stores/useUserStore';

export function App() {
  const { activeTab } = useUserStore();

  const renderActiveScreen = () => {
    switch (activeTab) {
      case 'journey':
        return <JourneyScreen />;
      case 'sparring':
        return <SparringScreen />;
      case 'soundlab':
        return <SoundLabScreen />;
      case 'srs':
        return <SRSVaultScreen />;
      case 'vault':
        return <MotivationVaultScreen />;
      case 'profile':
        return <ProfileScreen />;
      default:
        return <JourneyScreen />;
    }
  };

  return (
    <div className="mobile-app-wrapper">
      <div className="mobile-device-container">
        {/* Header thông số người học */}
        <MobileHeader />

        {/* Nội dung màn hình theo Tab */}
        <main className="app-screen-scrollable">
          {renderActiveScreen()}
        </main>

        {/* 4 Tabs điều hướng công thái học */}
        <BottomNav />

        {/* Modal Onboarding & Placement Test khi vào app lần đầu */}
        <AdaptivePlacementModal />
      </div>
    </div>
  );
}

export default App;
