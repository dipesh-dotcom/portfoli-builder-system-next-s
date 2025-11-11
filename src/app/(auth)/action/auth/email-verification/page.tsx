"use client";

import { Suspense } from "react";
import EmailVerificationContent from "./EmailVerificationContent";
import { motion } from "framer-motion";
import { Loader2 } from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

export default function EmailVerificationPage({
  searchParams,
}: {
  searchParams: { token: string };
}) {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-950">
      <Suspense
        fallback={
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <Card className="w-full max-w-md shadow-md border border-gray-200 dark:border-gray-800">
              <CardHeader className="text-center">
                <CardTitle className="text-xl font-semibold text-gray-800 dark:text-gray-100">
                  Verifying your email...
                </CardTitle>
              </CardHeader>
              <CardContent className="flex justify-center py-6">
                <Loader2 className="w-6 h-6 animate-spin text-primary" />
              </CardContent>
            </Card>
          </motion.div>
        }
      >
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="w-full max-w-md"
        >
          <EmailVerificationContent token={searchParams.token} />
        </motion.div>
      </Suspense>
    </div>
  );
}
