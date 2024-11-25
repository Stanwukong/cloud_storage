import { cn, formatDateTime } from "@/lib/utils";
import React from "react";

type FormattedDateTimeProps = {
  date: string;
  className?: string;
};

const FormattedDateTime = ({ date, className }: FormattedDateTimeProps) => {
  return (
    <div className={cn("body-1 text-light-500", className)}>
      {formatDateTime(date)}
    </div>
  );
};

export default FormattedDateTime;
