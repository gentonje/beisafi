import React, { createContext, useContext, useEffect, useState } from 'react';
import { Session, AuthChangeEvent } from '@supabase/supabase-js';
import { supabase } from '../integrations/supabase/client';
import { Profile } from '../types/profile';

interface AuthContextType {
  session: Session | null;
  loading: boolean;
  user: Profile | null; // Added user property
}

const AuthContext = createContext<AuthContextType>({
  session: null,
  loading: true,
  user: null, // Default value for user
});

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<Profile | null>(null);

  useEffect(() => {
    // Get initial session
    supabase.auth.getSession().then(({ data: { session: initialSession } }) => {
      setSession(initialSession);
      setLoading(false);
    });

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event: AuthChangeEvent, currentSession: Session | null) => {
        setSession(currentSession);
        setLoading(false);
      }
    );

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  useEffect(() => {
    // Fetch user profile when session changes
    if (session) {
      supabase
        .from('profiles')
        .select('*')
        .eq('id', session.user.id)
        .single()
        .then(({ data, error }) => {
          if (error) {
            console.error('Error fetching user profile:', error);
          } else {
            setUser(data);
          }
        });
    } else {
      setUser(null);
    }
  }, [session]);

  return (
    <AuthContext.Provider value={{ session, loading, user }}>
      {children}
    </AuthContext.Provider>
  );
};
