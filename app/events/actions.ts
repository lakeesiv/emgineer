"use server";

import { getServerAuthSession } from "server/auth";
import { api } from "trpc/server";

import * as evt from "server/api/routers/events";
import { createAction } from "server/api/trpc";

export const signUp = createAction(evt.signUp);
